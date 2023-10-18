// ---------------------------------------------------------------------------------------------
// YOU CAN FREELY MODIFY THE CODE BELOW IN ORDER TO COMPLETE THE TASK
// ---------------------------------------------------------------------------------------------

import Player from "../../db/model/player";
import PlayerSkill from "../../db/model/playerSkill";

import { playerValidation, playerSkillValidation } from "../validation";

export default async (req, res) => {
  const { playerSkills } = req.body;
  const playerId = req.params.id;

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

  // Validation Check while updating
  const playerValidationRes = playerValidation(req.body);
  const playerSkillValidationRes = playerSkillValidation(playerSkills);

  const validationMessage = playerValidationRes
    ? playerValidationRes
    : playerSkillValidationRes
    ? playerSkillValidationRes
    : false;

  if (!validationMessage) {
    await Player.update(req.body, { where: { id: playerId } })
      .then(() => {
        const newParams = assignPlayerId(playerId, playerSkills);
        PlayerSkill.destroy({ where: { playerId: playerId } });
        PlayerSkill.bulkCreate(newParams);
      })
      .then(() => Player.findByPk(playerId, { include: PlayerSkill }))
      .then(result => res.status(200).send(result))
      .catch(err => {
        res.status(400).send({
          message:
            err.message || `Error occurred while update player ID ${playerId}`,
        });
      });
  } else {
    res.status(400).send({
      message: validationMessage,
    });
  }
};