// ---------------------------------------------------------------------------------------------
// YOU CAN FREELY MODIFY THE CODE BELOW IN ORDER TO COMPLETE THE TASK
// ---------------------------------------------------------------------------------------------

import Player from '../../db/model/player';
import PlayerSkill from '../../db/model/playerSkill';

export default async (req, res) => {
  const requests = req.body;
  let positions = [];
  let skills = [];

  try {
    requests.map(async request => {
      positions.push(request.position);
      skills.push(request.mainSkill);
    });
    await Player.findAll({
      where: { position: positions },
      include: { model: PlayerSkill, where: { skill: skills } },
      order: [[PlayerSkill, 'value', 'desc']],
    }).then(result => res.status(200).send(result));
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Unable to processs the submitted request',
    });
  }
};