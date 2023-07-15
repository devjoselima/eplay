import ProductsList from '../../components/ProductList'

import {
  useGetActionGamesQuery,
  useGetSportGamesQuery,
  useGetFightGamesQuery,
  useGetRpgGamesQuery,
  useGetSimulationGamesQuery
} from '../../services/api'

const Categories = () => {
  const { data: actionGames } = useGetActionGamesQuery()
  const { data: fightGames } = useGetFightGamesQuery()
  const { data: rpgGames } = useGetRpgGamesQuery()
  const { data: sportGames } = useGetSportGamesQuery()
  const { data: simulationGames } = useGetSimulationGamesQuery()

  if (actionGames && fightGames && rpgGames && simulationGames && sportGames) {
    return (
      <>
        <ProductsList
          games={actionGames}
          title="Ação"
          background="black"
          id="action"
        />
        <ProductsList
          games={sportGames}
          title="Esportes"
          background="gray"
          id="sports"
        />
        <ProductsList
          games={fightGames}
          title="Luta"
          background="black"
          id="fight"
        />
        <ProductsList
          games={simulationGames}
          title="Simulação"
          background="gray"
          id="simulation"
        />
        <ProductsList
          games={rpgGames}
          title="RPG"
          background="black"
          id="rpg"
        />
      </>
    )
  }

  return <h4>Carregando...</h4>
}

export default Categories
