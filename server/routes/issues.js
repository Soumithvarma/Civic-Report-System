
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Issue = require('../models/Issue');
const User = require('../models/User');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Store images in uploads folder
  },
  filename: (req, file, cb) => {
    
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    // Only accept image files
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// GET ALL ISSUES

router.get('/', async (req, res) => {
  try {
    const { category, status } = req.query;


    let filter = {};
    if (category) filter.category = category;
    if (status) filter.status = status;


    const issues = await Issue.find(filter)
      .sort({ createdAt: -1 })
      .populate('userId', 'name email'); 

    res.json(issues);
  } catch (error) {
    console.error('Error fetching issues:', error);
    res.status(500).json({ message: 'Error fetching issues' });
  }
});

// GET SINGLE ISSUE

router.get('/:id', async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id)
      .populate('userId', 'name email');

    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    res.json(issue);
  } catch (error) {
    console.error('Error fetching issue:', error);
    res.status(500).json({ message: 'Error fetching issue' });
  }
});

// CREATE NEW ISSUE

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, description, category, location, userId } = req.body;

   
    if (!title || !description || !category || !location || !userId) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: 'Invalid user' });
    }


    const newIssue = new Issue({
      title,
      description,
      category,
      location,
      image: req.file ? `/uploads/${req.file.filename}` : '',
      userId
    });

    await newIssue.save();

    res.status(201).json({
      message: 'Issue submitted successfully',
      issue: newIssue
    });
  } catch (error) {
    console.error('Error creating issue:', error);
    res.status(500).json({ message: 'Error creating issue' });
  }
});

// UPDATE ISSUE STATUS

router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body;

   
    if (!['Pending', 'In Progress', 'Resolved'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

   
    const updatedIssue = await Issue.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true } 
    ).populate('userId', 'name email');

    if (!updatedIssue) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    res.json({
      message: 'Issue status updated',
      issue: updatedIssue
    });
  } catch (error) {
    console.error('Error updating issue:', error);
    res.status(500).json({ message: 'Error updating issue' });
  }
});

// DELETE ISSUE

router.delete('/:id', async (req, res) => {
  try {
    const deletedIssue = await Issue.findByIdAndDelete(req.params.id);

    if (!deletedIssue) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    res.json({ message: 'Issue deleted successfully' });
  } catch (error) {
    console.error('Error deleting issue:', error);
    res.status(500).json({ message: 'Error deleting issue' });
  }
});

module.exports = router;
