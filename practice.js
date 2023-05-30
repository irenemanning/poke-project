const movies = [
    {title: 'Titanic',
    star: 'Leo'}, 
    {title: 'R&J',
    star: 'Leo'}, 
    {title: 'Polyester',
    star: 'Devine'}] 

const leoMovies = movies.filter((movie) => movie.star === "Leo")
