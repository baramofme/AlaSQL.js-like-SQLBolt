import movies from './data-movies'

export const script = {
  tableName: "movies",
  name:"getting-started",
  queries: [
    "CREATE TABLE IF NOT EXISTS movies (id INT, title VARCHAR, director VARCHAR, year INTEGER, length_minutes VARCHAR)",
    "INSERT INTO movies SELECT * FROM ?"
  ],
  dataSet: movies
};

export default script
