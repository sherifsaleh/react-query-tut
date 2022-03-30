import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom"
import "./App.css"
import { DependentQueriesPage } from "./components/DependentQueries.page"
import { DynamicParallelPage } from "./components/DynamicParallel.page"
import { HomePage } from "./components/Home.page"
import { InfiniteQueriesPage } from "./components/InfiniteQueries.page"
import { PaginatedQueriesPage } from "./components/PaginatedQueries.page"
import { ParallelQueriesPage } from "./components/ParallelQueries.page"
import { RQMutatePage } from "./components/RQMutate.page"
import { RQSuperHeroPage } from "./components/RQSuperHero.page"
import { RQSuperHeroesPage } from "./components/RQSuperHeroes.page"
import { RQSuperHeroesPageOnClick } from "./components/RQSuperHeroesOnClick.page"
import { SuperHeroesPage } from "./components/SuperHeroes.page"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/super-heroes">Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-super-heroes">RQ Super Heroes</Link>
              </li>

              <li>
                <Link to="/rq-super-heroes-on-click">
                  RQ Super Heroes on click
                </Link>
              </li>

              <li>
                <Link to="/rq-parallel">RQ Parallel</Link>
              </li>
              <li>
                <Link to="/rq-dynamic-parallel">Dyanmic Parallel</Link>
              </li>
              <li>
                <Link to="/rq-dependent-queries">Dependent queries</Link>
              </li>
              <li>
                <Link to="/rq-pagination">Pagination</Link>
              </li>
              <li>
                <Link to="/rq-infinite">Infinite</Link>
              </li>
              <li>
                <Link to="/rq-mutate">Mutate</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/rq-infinite">
              <InfiniteQueriesPage />
            </Route>

            <Route path="/rq-mutate">
              <RQMutatePage />
            </Route>
            <Route path="/rq-pagination">
              <PaginatedQueriesPage />
            </Route>
            <Route path="/rq-dependent-queries">
              <DependentQueriesPage email="sherif@example.com" />
            </Route>
            <Route path="/rq-dynamic-parallel">
              <DynamicParallelPage heroIds={[1, 3]} />
            </Route>

            <Route path="/rq-parallel">
              <ParallelQueriesPage />
            </Route>

            <Route path="/rq-super-heroes/:heroId">
              <RQSuperHeroPage />
            </Route>

            <Route path="/super-heroes">
              <SuperHeroesPage />
            </Route>
            <Route path="/rq-super-heroes">
              <RQSuperHeroesPage />
            </Route>

            <Route path="/rq-super-heroes-on-click">
              <RQSuperHeroesPageOnClick />
            </Route>

            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
