import client from '../database/index.js';




//CREATE
export const createUsers = async (req, res) => {
  try {
    
    const { name, color, hobby } = req.body;
    
    const response = await client.query(`INSERT INTO users(name, color, hobby) VALUES ($1, $2, $3)`, [name, color, hobby]);

    if (response) {
      return res.status(200).json({ status: 'success', msg: 'User details posted successfully!'});
    }
  } catch (err) {
    console.log(err);
  }
};
//READ
export const getUsers = async (req, res) => {
  try {
    const response = await client.query('SELECT * FROM users ORDER BY id ASC');

    if (response) {
      return res.status(200).json({ status: 'success', data: response.rows });
    }
  } catch (err) {
    console.log(err);
  }
};
//UPDATE
export const updateUsers = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const { name, color,hobby } = req.body;
      
    const response = await client.query('UPDATE users SET name = $1,  color = $2, hobby= $3 WHERE id = $4',
    [name, color,hobby, id]);

    if (response) {
      return res.status(200).json({ status: 'success', data: response.rows });
    }
  } catch (err) {
    console.log(err);
  }
};
//DELETE
export const deleteUsers = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
      
    const response = await client.query('DELETE FROM users WHERE id = $1', [id]);

    if (response) {
      return res.status(200).json({ status: 'success', data: response.rows });
    }
  } catch (err) {
    console.log(err);
  }
};
