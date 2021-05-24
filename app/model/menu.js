'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;

  const MenuSchema = new Schema({
    id: { type: Number, required: true  },
    menu_name: { type: String, default: null  },
    url: { type: String, default: null  },
    parent_id: { type: Number, default: null  },
    orders: { type: Number, default: null  },
    logo_tag: { type: String, default: null  },
    level: { type: Number, default: null  },
    create_time: { type: Date, default: Date.now, required: true },
    modify_time: { type: Date, default: Date.now, required: true }
  });

  MenuSchema.index({ id: 1 }, { name: 'key_id' });

  MenuSchema.pre('save', function(next) {
    const now = new Date();
    this.modify_time = now;
    next();
  });

  return mongoose.model('Menu', MenuSchema, 'menu');
};
