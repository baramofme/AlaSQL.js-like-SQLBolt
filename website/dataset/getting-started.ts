import data from './data-movies'
import qas from './qa-create-table'

export const script: Object = {
  tableName: "movies",
  name:"getting-started",
  queries: [
    "CREATE TABLE IF NOT EXISTS movies (id INT, title VARCHAR, director VARCHAR, year INTEGER, length_minutes VARCHAR)",
    "INSERT INTO movies SELECT * FROM ?"
  ],
  dataSet: data,
  qaSet: qas
};

export default script
