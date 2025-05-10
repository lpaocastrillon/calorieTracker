import { useEffect, useMemo, useReducer } from "react" //useReducer Estado global
import Form from "./components/Form"
import { activityReducer, initialState } from "./reducers/activity-reducer"
import ActivityList from "./components/ActivityList"
import CalorieTracker from "./components/CalorieTracker"

function App() {

    const [state, dispatch] = useReducer(activityReducer, initialState)

    useEffect(() => {
        localStorage.setItem('activities', JSON.stringify(state.activities))
      }, [state.activities])

    const canRestartApp = () => useMemo(() => state.activities.length, [state.activities])

    return (
      <>

        <div className=" w-screen h-screen bg-morning-birch">
          <header className="bg-evergreen-shadow shadow-xl py-3 h-16">
            <div className="max-w-4xl mx-auto flex justify-between items-center h-full">
              <h1 className="text-4xl font-bold text-slate-800">
                Calorie Tracker
              </h1>

              <button className="bg-gray-800 hover:bg-gray-900 p-2 font-bold text-white 
                cursor-pointer rounded-lg text-sm disabled:opacity-10"
                disabled={!canRestartApp()}
                onClick={() => dispatch({type: 'restart-app'})}
              >
                Restart App
              </button>
            </div>
          </header>

          <div className="flex">
            <section className="flex-1 p-5 pl-15">
              <div className=" mx-auto">
                <Form 
                  dispatch={dispatch}
                  state={state}
                />
              </div>

              <div className="bg-white shadow-2xl py-5 rounded-lg mt-5">
                <CalorieTracker
                  activities={state.activities}
                />
              </div>

            </section>

            <section className="flex-1 p-5 mx-auto">
              <ActivityList 
                activities={state.activities}
                dispatch={dispatch}
              />
            </section>
          </div>
        </div>
      </>
    )
}

export default App
