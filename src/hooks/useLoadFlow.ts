import { useEffect } from 'react'
import { useAppDispatch } from './useAppDispatch'
import { setLoading, setError, init } from '@/store/quizSlice'
import { loadFlowA, loadFlowB } from '@/api/adapters'

export function useLoadFlow(flow: 1|2|null) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    let mounted = true
    async function run() {
      if (!flow) return
      try {
        dispatch(setLoading(true))
        if (flow === 1) {
          const rounds = await loadFlowA()
          if (!mounted) return
          dispatch(init({ flow: 'A', rounds }))
        } else {
          const rounds = await loadFlowB()
          if (!mounted) return
          dispatch(init({ flow: 'B', rounds }))
        }
      } catch (e: any) {
        dispatch(setError(e?.message ?? 'Failed to load'))
      } finally {
        if (mounted) dispatch(setLoading(false))
      }
    }
    run()
    return () => { mounted = false }
  }, [flow, dispatch])
}
