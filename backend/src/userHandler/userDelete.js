const Delete =  async (req, res) => {
  try{
    const { username } = req.params;
    await usersCollection.deleteOne({username: username})
    res.send(`User, ${username} deleted`)
  } catch(e) {
    res.status(500).json({ error: 'delete user failed' });
  }
}

export default Delete;