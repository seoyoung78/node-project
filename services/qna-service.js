const db = require("../sequelize/models/index");
const Op = db.Sequelize.Op;

module.exports = {
  totalRows: async function(state) {
    try {
      let where = null;
      if (state == "미답변") {
        where = {answer_state: 0}
      } else if (state == "답변 완료") {
        where = {answer_state: 1}
      }

      const result = await db.Qna.count({
        where
      });
      return result;
    } catch(error) {
      throw error;
    }
  },

  list: async function(pager, state) {
    try {
      let where = null;
      if (state == "미답변") {
        where = {answer_state: 0}
      } else if (state == "답변 완료") {
        where = {answer_state: 1}
      }

      const result = await db.Qna.findAll({
        where,
        order: [["qna_no", "DESC"]],
        limit: pager.rowsPerPage,
        offset: pager.startRowIndex
      })
      
      return result;
    } catch(error) {
      throw error;
    }
  },

  getQna: async function(qnaNo) {
    try {
      const qna = await db.Qna.findOne({
        where: {qna_no: qnaNo},
        include: [{
          model: db.User,
          attributes: ["user_name"]
        }]
      });
      return qna;
    } catch(error) {
      throw error;
    }
  },

  update: async function(qna) {
    try{
      let row;
      if (qna.answer_state == 1) {
        row = await db.Qna.update({
          answer_content: qna.answer_content
        }, {
          where: {qna_no: qna.qna_no}
        })
      } else {
        qna.answer_date = new Date();
        row = await db.Qna.update({
          answer_state: 1,
          answer_date: qna.answer_date,
          answer_content: qna.answer_content
        }, {
          where: {qna_no: qna.qna_no}
        })
      }      
      return row;
    } catch(error) {
      throw error;
    }
  },

  delete: async function(qno) {
    try {
      const row = await db.Qna.destroy({
        where: {qna_no: qno}
      });
      return row;
    } catch(error) {
      throw error;
    }
  }
};