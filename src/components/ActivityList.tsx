import { useMemo, Dispatch } from "react"
import { Activity } from "../types"
import { categories } from "../data/categories"
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { ActivityActions } from "../reducers/activity-reducer"

type ActivityListProps = {
    activities: Activity[],
    dispatch: Dispatch<ActivityActions>
}

export default function ActivityList({activities, dispatch} : ActivityListProps) {
  
    const categoriesName = useMemo(() => 
        (category: Activity['category']) => categories.map( cat => cat.id === category ? cat.name : ''),
    [activities])

    const isEmptyAtivities = useMemo(() => activities.length === 0, [activities])

    return ( 
        <>
            <h2 className=' text-4xl font-bold text-slate-700 text-center'>
                Food and Activities
            </h2>

            {isEmptyAtivities ? <p className="text-center my-5 text-slate-700 font-bold mt-5">There's not activities yet  </p> : 
                activities.map( activity =>  (
                    <div key={activity.id} className="px-5 py-5 bg-white mt-5 flex justify-between shadow rounded-sm">
                        <div className="space-y-1 relative">
                            <p className={`absolute -top-2 -left-8 px-10 text-white font-bold text-sm
                                ${activity.category === 1 ? 'bg-evergreen-shadow' : 'bg-alpine-clay'}`}>	
                                    {categoriesName (+activity.category)}
                                </p>
                            <p className="text-sm font-bold pt-4">
                                {activity.name}
                            </p>
                            <p className="font-black text-xl text-orange-300">
                                {activity.calories} {''}
                                <span>Calories</span>
                            </p>
                        </div>

                        <div className="flex gap-5 items-center">
                            <button
                                onClick={() => dispatch({type: 'save-activeId', payload: {id: activity.id}})}
                            >
                                <PencilSquareIcon 
                                    className="h-6 w-6 text-slate-400 hover:text-slate-600" />
                            </button>

                            <button
                                onClick={() => dispatch({type: 'delete-activity', payload: {id: activity.id}})}
                            >
                                <XCircleIcon 
                                    className="h-6 w-6 text-red-400 hover:text-red-600" />
                            </button>

                        </div>
                    </div>
                ))
            }
        </>
    
  )
}
