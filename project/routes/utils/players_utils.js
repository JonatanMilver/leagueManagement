const axios = require("axios");
const league_utils = require("./league_utils")
const api_domain = "https://soccer.sportmonks.com/api/v2.0";
// const TEAM_ID = "85";

async function getPlayerIdsByTeam(team_id) {
  let player_ids_list = [];
  const team = await axios.get(`${api_domain}/teams/${team_id}`, {
    params: {
      include: "squad",
      api_token: process.env.api_token,
    },
  });
  team.data.data.squad.data.map((player) =>
    player_ids_list.push(player.player_id)
  );
  return player_ids_list;
}

async function getPlayersInfo(players_ids_list, full_details) {
  let promises = [];
  players_ids_list.map((id) =>
    promises.push(
      axios.get(`${api_domain}/players/${id}`, {
        params: {
          api_token: process.env.api_token,
          include: "team.league",
        },
      })
    )
  );
  let players_info = await Promise.all(promises);
  if(full_details){
    return extractAllData(players_info);
  }
  return extractRelevantPlayerData(players_info);
}

function extractAllData(players_info){
  let ret = [];
  players_info.map((player_info) => {
    if(player_info.data.data.team.data.league.data.id == league_utils.getLeagueID()){ //check if league id equals to 271
      const { fullname, image_path, position_id,
        common_name, nationality, birthdate,
        birthcountry, height, weight } = player_info.data.data;
      const { name } = player_info.data.data.team.data;

      let x = {
        name: fullname,
        image: image_path,
        position: position_id,
        team_name: name,
        common_name: common_name,
        nationality: nationality,
        birthdate: birthdate,
        birthcountry: birthcountry,
        height: height,
        weight: weight
      };

      ret.push(x);
    }
  });

  return ret;

  //#region 
  // return players_info.map((player_info) => {
  //   const { fullname, image_path, position_id,
  //           common_name, nationality, birthdate,
  //           birthcountry, height, weight } = player_info.data.data;
  //   const { name } = player_info.data.data.team.data;
  //   return {
  //     name: fullname,
  //     image: image_path,
  //     position: position_id,
  //     team_name: name,
  //     common_name: common_name,
  //     nationality: nationality,
  //     birthdate: birthdate,
  //     birthcountry: birthcountry,
  //     height: height,
  //     weight: weight
  //   };
  // });
  //#endregion
}

function extractRelevantPlayerData(players_info) {
  let ret = [];
  players_info.map((player_info) => {
        if(player_info.data.data.team.data.league.data.id == league_utils.getLeagueID()){ //check if league id equals to 271
        const { fullname, image_path, position_id } = player_info.data.data;
        const { name } = player_info.data.data.team.data;

        let x = {
              name: fullname,
              image: image_path,
              position: position_id,
              team_name: name,
            };
      ret.push(x);
    }
  });
  return ret;
  
  //#region 
  // return players_info.map((player_info) => {
  //   const { fullname, image_path, position_id } = player_info.data.data;
  //   const { name } = player_info.data.data.team.data;
  //   return {
  //     name: fullname,
  //     image: image_path,
  //     position: position_id,
  //     team_name: name,
  //   };
  // });
  //#endregion
}

function playerInLeagueCheck(player_info){
  return (player_info.team) && (player_info.team.data.league) && (player_info.team.data.league.data.id == league_utils.getLeagueID())
}

function filterByQuery(player_info, req_query){
  let team_name = req_query.team
  let position = req_query.position
  if(!team_name && !position){ //if both undefined, don't filter
    return true;
  }
  else if(!team_name && position){ //if team_name is undefined, filter by position only
    if(player_info.position_id == position){
      return true
    }
  }
  else if(team_name && !position){ //if position is undefined, filter by team_name only
    if(player_info.team && player_info.team.data.name == team_name){
      return true
    }
  }
  else{ // if both are defined, filter by both
    if(player_info.team && player_info.team.data.name == team_name && player_info.position_id == position){
      return true
    }
  }

  return false
}

function extractRelevantPlayerDataByName(players_info, req_query) {
  let ret = []
  players_info.map((player_info) => {
    if(playerInLeagueCheck(player_info) && filterByQuery(player_info, req_query)){
      const { fullname, image_path, position_id } = player_info;
      let name = player_info.team.data.name;

      ret.push({
        name: fullname,
        image: image_path,
        position: position_id,
        team_name: name,
      })
    }
  });
  return ret;
}

async function getPlayersByTeam(team_id) {
  let player_ids_list = await getPlayerIdsByTeam(team_id);
  let players_info = await getPlayersInfo(player_ids_list, false);
  return players_info;
}

async function getPlayerDetailsByName(player_name, req_query){
  const players = await axios.get(`${api_domain}/players/search/${player_name}`, {
    params: {
      api_token: process.env.api_token,
      include: "team.league",
    },
  });
  return extractRelevantPlayerDataByName(players.data.data, req_query);
}

exports.getPlayersByTeam = getPlayersByTeam;
exports.getPlayerDetailsByName = getPlayerDetailsByName;
exports.getPlayersInfo = getPlayersInfo;
