const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    lead: {
        type: String,
        required: true
    },
    coverPhoto: {
        id: {
            type: String,
            required: true
        },
        resolution: {
            width: {
                type: String,
                required: true
            },
            height: {
                type: String,
                required: true
            }
        },
        title: {
            type: String,
            required: true
        },
        links: {
            original: {
                type: String,
                required: true
            },
            tiny: {
                type: String
            },
            small: {
                type: String
            },
            medium: {
                type: String
            },
            large: {
                type: String
            },
            extraLarge: {
                type: String
            }
        }
    },
    body: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;