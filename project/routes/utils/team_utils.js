const axios = require("axios");
const api_domain = "https://soccer.sportmonks.com/api/v2.0";
const leauge_utils = require("./league_utils");

async function getTeamByName(team_name){
    let league_teams_list = []
    const teams_list = await axios.get(`${api_domain}/teams/search/${team_name}`, {
        params: {
          api_token: process.env.api_token,
          include: "league"
        },
      });

    //#region 
    // const teams_list_data = {
    //     data: [
    //       {
    //         id: 211,
    //         legacy_id: 631,
    //         name: 'Horsens',
    //         short_code: 'ACH',
    //         twitter: null,
    //         country_id: 320,
    //         national_team: false,
    //         founded: 1994,
    //         logo_path: 'https://cdn.sportmonks.com/images//soccer/teams/19/211.png',
    //         venue_id: 5661,
    //         current_season_id: 17328,
    //         is_placeholder: false
    //       }
    //     ],
    //     meta: { plans: [ [Object] ], sports: [ [Object], [Object] ] }
    //   }
    //   console.log(teams_list.data);
    //#endregion

    teams_list.data.data.map((team) => {
        if(team.league.data.id === leauge_utils.getLeagueID()){
          team_relevant_info = {name: team.name, logo: team.logo_path}
            league_teams_list.push(team_relevant_info);
        }
    });
    console.log(league_teams_list)
    return league_teams_list;
}

async function getTeamById(team_id){
  const team_data = await axios.get(`${api_domain}/teams/${team_id}`, {
    params: {
      api_token: process.env.api_token,
      include: "league"
    },
  });
  return team_data;
}


exports.getTeamByName = getTeamByName;
exports.getTeamById = getTeamById;