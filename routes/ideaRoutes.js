const express = require('express')
const router = express.Router();
const Idea = require('../models/Idea');
const protect = require('../middleware/authMiddleware');

// @desc Get all ideas
// @route /api/ideas/
// access public
router.get('/', async(req, res) => {
    try {
        const data = await Idea.find();
        res.json({success: true, data: data});

    } catch (error) {
        res.status(500).json('Something went wrong!');
        console.log(error);
    }
});


// @desc Create new idea
// @route /api/ideas/
// access private
router.post('/', protect, async(req, res) => {
    try {
        const idea = new Idea({
            text: req.body.text,
            user: String(req.user._id),
            username: req.user.name,
            tag: req.body.tag            
        });
        const savedIdea = await idea.save();

        res.json({success: true, data: savedIdea});

    } catch (error) {
        res.status(500).json('Something went wrong!');
        console.log(error);
    }
})

// @desc Get single idea
// @route /api/ideas/id
// access public
router.get('/:id', async(req, res) => {
    try {
       const idea = await Idea.findById(req.params.id);
       return res.json({success: true, data: idea})

    } catch (error) {
        res.status(500).json('Something went wrong!');
        console.log(error);
    }
})

// @desc Update idea
// @route /api/ideas/id
// access private
router.put('/:id', protect, async(req, res) => {
    try {
        const idea = await Idea.findById(req.params.id)
        
        if (idea.user === String(req.user._id)) {
   
            const updatedIdea = await Idea.findByIdAndUpdate(
                req.params.id, 
                {
                    $set: {
                        text: req.body.text || idea.text,
                        tag: req.body.tag || idea.tag,
                    }
                },
                { new: true }
            );
           return res.json({success: true, data: updatedIdea});
        } 

        res.status(403).json('Not authorized');

    } catch (error) {
        res.status(500).json('Something went wrong!');
        console.log(error);
    }
})

// @desc Delete idea
// @route /api/ideas/id
// access private
router.delete('/:id', protect, async(req, res) => {
    try {
        const idea = await Idea.findById(req.params.id);
        if (idea.user === String(req.user._id)) {

            const deletedIdea = await Idea.findByIdAndDelete(req.params.id);
            return res.json({success: true, data: deletedIdea});
        } 
        
        res.status(403).json('Not authorized');

    } catch (error) {
        res.status(500).json('Something went wrong!');
        console.log(error);
    }
})

module.exports = router;