// ---------------------------------------------------------------------------------------------
// YOU CAN FREELY MODIFY THE CODE BELOW IN ORDER TO COMPLETE THE TASK
// ---------------------------------------------------------------------------------------------

import Player from "../../db/model/player";
import PlayerSkill from "../../db/model/playerSkill";
import { playerSkillValidation, playerValidation } from '../validation';

export default async (req, res) => {
  const { playerSkills } = req.body;
  let playerId;

  const assignPlayerId = (id, playerSkills) => {
    let updatedSkillItems = [];
    playerSkills.map(skillItem =>
      updatedSkillItems.push({
        skill: skillItem.skill,
        value: skillItem.value,
        playerId: id,
      })
    );
    return updatedSkillItems;
  };

  // Validation Check while creating
  const playerValidationRes = playerValidation(req.body);
  const playerSkillValidationRes = playerSkillValidation(playerSkills);

  const validationMessage = playerValidationRes
    ? playerValidationRes
    : playerSkillValidationRes
    ? playerSkillValidationRes
    : false;

  // Create new player
  if (!validationMessage) {
    await Player.create(req.body)
      .then(data => {
        playerId = data.id;
        const newParams = assignPlayerId(playerId, playerSkills);
        PlayerSkill.bulkCreate(newParams);
      })
      .then(() => Player.findByPk(playerId, { include: PlayerSkill }))
      .then(result => res.status(200).send(result))
      .catch(err => {
        res.status(400).send({
          message: err.message || 'Error occurred while creating player',
        });
      });
  } else {
    res.status(400).send({
      message: validationMessage,
    });
  }
};
