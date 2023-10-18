// ---------------------------------------------------------------------------------------------
// YOU CAN FREELY MODIFY THE CODE BELOW IN ORDER TO COMPLETE THE TASK
// ---------------------------------------------------------------------------------------------

import Player from "../../db/model/player";
import PlayerSkill from "../../db/model/playerSkill";

//Get List of All players
export default async (req, res) => {
  try{
    const players = await Player.findAll({include: PlayerSkill});
    return res.status(200).json(players)
  }catch(error){
    return res.status(500).json({ message: error.message });
  }  
}
