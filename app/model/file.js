'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;

  const FileSchema = new Schema({
    id: { type: Number, required: true },
    file_type: { type: String, required: true },
    file_size: { type: String, default: null  },
    file_url: { type: String, required: true },
    file_name: { type: String, default: null   },
    is_deleted: { type: Number, default: 0, required: true },
    create_time: { type: Date, default: Date.now, required: true },
    modify_time: { type: Date, default: Date.now, required: true }
  });

  FileSchema.index({ file_url: 1 }, { name: 'key_file_url' });

  FileSchema.pre('save', function(next) {
    const now = new Date();
    this.modify_time = now;
    next();
  });

  FileSchema.set('toObject', { virtuals: true });

  return mongoose.model('File', FileSchema, 'file');
};
