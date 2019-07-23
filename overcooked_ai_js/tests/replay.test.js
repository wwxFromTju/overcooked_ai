import _ from 'lodash';
import $ from "jquery";

require("../overcooked-window.js");

let OvercookedMDP = window.Overcooked.OvercookedMDP;

let PlayerState = OvercookedMDP.PlayerState;
let ObjectState = OvercookedMDP.ObjectState;
let Direction = OvercookedMDP.Direction;
let Action = OvercookedMDP.Action;
let OvercookedGridworld = OvercookedMDP.OvercookedGridworld;
let OvercookedState = OvercookedMDP.OvercookedState;

let dictToState = OvercookedMDP.dictToState; 
let lookupActions = OvercookedMDP.lookupActions;

expect.extend({
  toEqualState(received, expected) {
    let pass = _.isEqual(
        JSON.stringify(received),
        JSON.stringify(expected)
    );
    if (!pass) {
        let r = JSON.stringify(received);
        let e = JSON.stringify(expected);
        return {
            message: () =>
                `Received: ${r}\nExpected: ${e}`,
            pass: false
        };
    } else {
      return {
        message: () => "",
        pass: true
      };
    }
    }
});

const trajectoryPath = "../../common_tests/test_traj.json"



test('States and rewards are equivalent between python and JS', () => {

	$.getJSON(trajectoryPath, function(trajectoryData) {
	game = new OvercookedGame({
        start_grid,
        container_id,
        assets_loc: "assets/",
        ANIMATION_DURATION: 200*.9,
        tileSize: 80,
        COOK_TIME: 5,
        explosion_time: Number.MAX_SAFE_INTEGER,
        DELIVERY_REWARD: DELIVERY_REWARD,
        always_serve: always_serve,
        player_colors: player_colors
    });

	let alignedStates = []; 
	let alignedRewards = [];

	let observations = trajectory.ep_observations[0];
    let actions = trajectory.ep_actions[0];
    let rewards = trajectory.ep_rewards[0];

    let current_state = dictToState(observations[0]);

    let i = 0; 
    while (i < observations.length - 2) {
    	let joint_action = lookupActions(actions[i]); 
    	let trajectory_reward = rewards[i]
    	let  [[next_transitioned_state, prob], transitioned_reward] =
                    game.mdp.get_transition_states_and_probs({
                        state: current_state,
                        joint_action: joint_action
                    }); 
        let next_trajectory_state = dictToState(observations[i+1])
        alignedStates.push({'trajectory': next_trajectory_state,  'transitioned': next_transitioned_state}); 
        alignedRewards.push({'trajectory': trajectory_reward, 'transitioned': transitioned_reward})
    	i += 1; 
    }

	console.log(alignedStates); 
	console.log(alignedRewards);
	alignedStates.forEach(function(item, index) {
		expect(item['trajectory']).toEqualState(item['transitioned'])
	})
	alignedRewards.forEach(function(item, index) {
		expect(item['trajectory']).toBe(item['transitioned'])
	})

		}); 

});





