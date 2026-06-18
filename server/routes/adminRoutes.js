const express = require("express");
const User = require("../models/User");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// @route GET /admin/users
// @desc Get alll users (Admin only)
// @access Private/Admin
router.get("/users", protect,admin, async (req, res) =>{
  try{
    const users = await User.find({});
    res.json(users);
  } catch (error){
    console.error(error);
    res.status(500).json({ message: "Server Error"});
  }
});

// @route POST /admin/users
// @desc Add a new user (admin only)
// @access Private(admin)
router.post("/users", protect, admin, async (req, res)=>{
  const { name, email, password, role} = req.body;

  try{
    let user = await User.findOne({ email});
    if(user) {
      return res.status(400).json({ message: "User already existe"});
    }

    user = new User({
      name, email, password, role: role || "customer",
    });

    await user.save();
    res.status(201).json({ message: "User created successfully", user});
  } catch (error){
    console.error(error);
    res.status(500).json({ message: "Server error"});
  }
});

// @route PUT /admin/users/:id
// @desc Update user info (admin only) - Name, emali and role
// @access Private/Admin
// @route PUT /admin/users/:id
router.put("/users/:id", protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;

    const updatedUser = await user.save();
    return res.json({ message: "Updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

// @route DELETE /admin/users/:id
// @desc Delete a user
// @access Private/Admin

router.delete("/users/:id", protect, admin, async (req, res)=>{
  try{
    const user = await User.findById(req.params.id);
    if(user){
      await user.deleteOne();
      res.json({message: "User deleted successfully"});
    } else{
      res.status(404).json({ message: "User not found"});
    }
  } catch(error){
    console.error(error);
      res.status(500).json({message: "Server error"});
   }
});

module.exports = router;