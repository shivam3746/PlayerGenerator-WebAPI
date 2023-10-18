// ---------------------------------------------------------------------------------------------
// YOU CAN FREELY MODIFY THE CODE BELOW IN ORDER TO COMPLETE THE TASK
// ---------------------------------------------------------------------------------------------

import Player from "../../db/model/player";

export default async (req, res) => {
  try {
    await Player.destroy({
      where: { id: req.params.id },
    });
    res.status(200).send({
      message: `Player ID ${req.params.id} deleted successfuly`,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Make sure the player exists',
    });
  }
};