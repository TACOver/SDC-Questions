const mongoose = require('mongoose');

const qaSchema = new mongoose.Schema({
  {
    product_id: {
      type: Number,
      unique: true
    },
    questions: {
      type: Array,
      items: [
        {
          question_id: {
            type: Number,
            unique: true,
          },
          question_body: {
            type: String,
            required: true,
            maxLength: 100,
          },
          question_date: {
            type: Date,
          },
          asker_name: {
            type: String,
            required: true,
          },
          question_helpfulness: {
            type: Number,
          },
          question_reported: {
            type: Number,
          },
          answers: {
            type: Array,
            items: [
              {
                answer_id: {
                  type: Number,
                  unique: true,
                },
                question_id: {
                  type: Number,
                  unique: true,
                },
                answer_body: {
                  type: String,
                  required: true,
                  maxLength: 1000,
                },
                answer_date: {
                  type: Date,
                },
                answerer_name: {
                  type: String,
                  required: true,
                },
                answer_helpfulness: {
                  type: Number,
                },
                answer_reported: {
                  type: Number,
                },
                photos: {
                  type: Array,
                  items: [
                    {
                      photos_id: {
                        type: Number,
                        unique: true,
                      },
                      answer_id: {
                        type: Number,
                        unique: true,
                      },
                      photos_url: {
                        type: String,
                      }
                    }
                  ]
                }
              }
            ]
          }
        }
      ]
    }
  };

});

const QA = mongoose.model('QA', qaSchema);

module.exports = QA;