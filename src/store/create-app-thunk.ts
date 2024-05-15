import { createAsyncThunk } from '@reduxjs/toolkit'
import { type AppDispatch, type Dependencies, type RootState } from './store'

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: AppDispatch
  extra: Dependencies
}>()
