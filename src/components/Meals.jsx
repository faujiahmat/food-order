import useHttp from '../hooks/useHttp';
import Error from './Error';
import MealItem from './MealItem';

const requestMethod = {};

export default function Meals() {
  const {
    data: loadedMeals,
    error,
    isLoading,
  } = useHttp('http://localhost:3000/meals', requestMethod, []);

  if (isLoading) {
    return <p className="center">Loading meals...</p>;
  }

  if (error) {
    return <Error title="Error fetching meals" message={error} />;
  }

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
