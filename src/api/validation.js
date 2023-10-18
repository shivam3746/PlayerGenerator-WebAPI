const positions = ['defender', 'midfielder', 'forward']
const skills = ['defense', 'attack', 'speed', 'strength', 'stamina']

//Validating player profile creation
export const playerValidation = req => {
    const { name, position, playerSkills } = req;
  
    if (!name || !position || !playerSkills) {
      const response = `Player ${
        name === '' ? 'name' : position === '' ? 'position' : 'playerSkills'
      } can not be empty!`;
      return response;
    }
    if (!positions.includes(position)) {
      const response = `Invalid value for position: ${position}`;
      return response;
    }
  };
  
  //Validating playerskills
  export const playerSkillValidation = playerSkills => {
    let response;
    playerSkills.map(skillItem => {
      !skills.includes(skillItem.skill)
        ? (response = `Invalid value for skill: ${skillItem.skill}`)
        : null;
    });
    return response;
  };