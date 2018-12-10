const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const xl = require('excel4node');

// Load question model
const Response = require('../models/Response');
const Survey = require('../models/Survey');
const QuestionGroup = require('../models/QuestionGroup');
const Question = require('../models/Question');
const User = require('../models/User');
const MOCProfile = require('../models/MOCProfile');

// Load result calculator method
const resultNEO = require('./calculate/response/neo');
const resultRIASEC = require('./calculate/response/riasec');
const resultPsychologic = require('./calculate/response/psychologic');
const resultMOC = require('./calculate/response/moc');

// Load excel config
const { workbookConfig } = require('../config/excel');

module.exports = {
  createData: surveyId =>
    new Promise((resolve, reject) => {
      const dataSource = {
        result: {},
        emptyItem: 0,
        totalItem: 0,
      };

      QuestionGroup.find({
        survey: surveyId,
        childs: [],
        inputType: {
          $ne: 'text-area',
        },
      }).then(groups => {
        groups.map(group => {
          if (group.optionAnswers.length > 0) {
            group.questions.map(questionId => {
              dataSource.result[questionId] = {
                answers: {},
                ignored: 0,
              };

              group.optionAnswers.map(option => {
                dataSource.result[questionId].answers[option.score] = 0;
              });
            });
          }
        });

        _.mapKeys(dataSource.result, key => {
          Question.findById(key).then(question => {
            dataSource.result[key].content = question.content;
          });
        });

        return { dataSource, groups };
      });
    }),
};
