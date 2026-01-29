// src/features/pets/presentation/petSlice.ts

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { petsUseCse } from '../../../app/di/pets';
import { PetDTO } from '../application/dto/PetDto';
import { PetMapper } from '../application/mapper/petMapper';
import { CreatePetParams } from '../application/usecases/petUsecases';
import { Pet } from '../domain/entities/Pet';


interface PetsState {
    pets: PetDTO[];
    loading: boolean;
    error?: string;
}

const initialState: PetsState = {
    pets: [],
    loading: false,
};


export const fetchPetsByOwner = createAsyncThunk<
    PetDTO[],
    string
>('pets/fetchByOwner',
    async (ownerId: string) => {
        const pets = await petsUseCse.getPetsByOwner.execute(ownerId);
        return pets.map(PetMapper.toDTO);
    });


export const createPet = createAsyncThunk<
    PetDTO,
    CreatePetParams
>('pets/create', async (payload, { rejectWithValue }) => {
    try {
        const pet = await petsUseCse.createPet.execute(payload);
        return PetMapper.toDTO(pet);
    } catch (error: any) {
        return rejectWithValue(error?.message ?? 'Error creando mascota');
    }
});

export const updatePet = createAsyncThunk<
    PetDTO,
    PetDTO
>('pets/update', async petDto => {
    const pet = new Pet(
        petDto.id,
        petDto.ownerId,
        petDto.name,
        petDto.breed,
        petDto.size,
        petDto.photoUrl
    );

    const updated = await petsUseCse.updatePet.execute(pet);
    return PetMapper.toDTO(updated);
});

export const deletePet = createAsyncThunk<
    void,
    { petId: string; ownerId: string }
>('pets/delete', async ({ petId, ownerId }, { dispatch }) => {
    await petsUseCse.deletePet.execute(petId);
    dispatch(fetchPetsByOwner(ownerId));
});


const petsSlice = createSlice({
    name: 'pets',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            // FETCH
            .addCase(fetchPetsByOwner.fulfilled, (state, action: PayloadAction<PetDTO[]>) => {
                state.pets = action.payload;
            })
            .addCase(fetchPetsByOwner.rejected, (state, action) => {
                state.error = action.error.message;
            })
            // CREATE
            .addCase(createPet.pending, state => {
                state.loading = true;
            })
            .addCase(createPet.fulfilled, (state, action) => {
                state.loading = false;
                state.pets.push(action.payload);
            })
            .addCase(createPet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // UPDATE
            .addCase(updatePet.fulfilled, (state, action) => {
                const index = state.pets.findIndex(p => p.id === action.payload.id);
                if (index !== -1) state.pets[index] = action.payload;
            });
},
});


export const petsReducer = petsSlice.reducer;
