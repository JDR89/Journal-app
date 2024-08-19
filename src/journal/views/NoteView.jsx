import { DeleteOutline, SaveOutlined, UploadFileOutlined } from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import { ImageGallery } from "../components";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useRef } from "react";
import { setActiveNote } from "../../store/journal/journalSlice";
import { startDeletingNote, startSaveNote, startUpLoadingFiles } from "../../store/journal/thunks";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";


export const NoteView = () => {

  const{ active:note, isSaving, messageSaved }= useSelector((state) => state.journal)

  const dispatch = useDispatch()

  const{ body,title,date,onInputChange,formState }=useForm(note)

  const dateString = useMemo(() => {
    const newDate = new Date(date);

    return newDate.toUTCString();

  }, [date])

  const inputFileRef = useRef()

  useEffect(() => {
    dispatch(setActiveNote(formState))
  }, [formState])

  useEffect(() => {
    if(messageSaved.length > 0){
      Swal.fire('Guardado',messageSaved,'success')
    }
  }, [messageSaved])
  

  const onSaveNote = () => {
    dispatch(startSaveNote())
  }

  const onFileInputChange=({ target })=>{
    if(target.files === 0) return;
    
    dispatch(startUpLoadingFiles(target.files))
    
  }
  
  const onDelete=()=>{
    dispatch(startDeletingNote())
  }

  return (
    <Grid
      className="animate__animated animate__fadeIn animate__faster"
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          {dateString}
        </Typography>
      </Grid>
      <Grid item>

      <input
      onChange={onFileInputChange}
      multiple
      type="file"
      style={{display: 'none'}}
      ref={inputFileRef}
      />

      <IconButton
      color="primary"
      disabled={isSaving}
      onClick={() => inputFileRef.current.click()}
      >
        <UploadFileOutlined />
      </IconButton>

        <Button
        disabled={isSaving}
        onClick={onSaveNote} color="primary" sx={{ padding: 2 }}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese un título"
          label="Título"
          name="title"
          value={title}
          onChange={onInputChange}
          sx={{ border: "none", mb: 1 }}
        />

        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="¿Qué sucedió en el día de hoy?"
          minRows={5}
          name="body"
          onChange={onInputChange}
          value={body}
        />
      </Grid>

      <Grid container justifyContent={"end"}>
        <Button
        onClick={onDelete}
        sx={{mt:2}}
        color="error"
        >
          <DeleteOutline />
          Borrar
        </Button>
      </Grid>

      {/* Image gallery */}
      <ImageGallery
      images={note.imageUrls}
      />

    </Grid>
  );
};
