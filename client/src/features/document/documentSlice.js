import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import documentService from "./documentService";

const initialState = {
  documents: [],
  document: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new Document
export const createDocument = createAsyncThunk(
  "documents/create",
  async (documentData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access;
      return await documentService.createDocument(documentData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get Multiple Documents
export const getDocuments = createAsyncThunk(
  "documents/getDocument",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access;
      return await documentService.getDocuments(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);


// Get single Document
export const getDocument = createAsyncThunk(
  'documents/get',
  async (DocumentId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access
      return await documentService.getDocument(DocumentId, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Update single Document
export const updateDocument = createAsyncThunk(
  "documents/update",
  async (DocumentData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access;
      return await documentService.updateDocument(DocumentData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete Document
export const deleteDocument = createAsyncThunk(
  "documents/delete",
  async (DocumentId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access;
      return await documentService.deleteDocument(DocumentId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const documentSlice = createSlice({
  name: "Document",
  initialState,
  reducers: {
    reset: () => initialState,
    resetVariables: (state) => {
      state.isError = false
      state.isLoading = false
      state.isSuccess = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDocument.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createDocument.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createDocument.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getDocuments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDocuments.fulfilled, (state, action) => {
        console.log('Documents', action.payload)
        state.isLoading = false;
        state.documents = action.payload;
      })
      .addCase(getDocuments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getDocument.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDocument.fulfilled, (state, action) => {
        state.isLoading = false;
        state.document = action.payload;
      })
      .addCase(getDocument.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateDocument.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateDocument.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.document = action.payload;
      })
      .addCase(updateDocument.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteDocument.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteDocument.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(deleteDocument.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, resetVariables } = documentSlice.actions;
export default documentSlice.reducer;