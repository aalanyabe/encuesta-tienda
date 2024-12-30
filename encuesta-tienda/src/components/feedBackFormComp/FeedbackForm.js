import StarIcon from "@mui/icons-material/Star";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React from "react";

const FeedbackForm = ({enviar}) => {
  return (
    <Box
      sx={{
        width: 895,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 2.5,
        px: 10,
        py: 10,
        position: "relative",
        backgroundColor: "rgba(7, 0, 0, 0.51)",
        borderRadius: 2,
        backgroundImage: "url(/img/frame-9.png)",
        backgroundSize: "cover",
        backgroundPosition: "50% 50%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          flex: 1,
        }}
      >
        <Typography
          variant="h4"
          component="p"
          sx={{
            width: 566,
            height: 88,
            mt: -1,
            fontFamily: "'Urbanist', Helvetica",
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
          }}
        >
          ¿Cómo calificaría el apoyo que recibió?
        </Typography>

        <Grid container spacing={2.5} justifyContent="center">
          {["Muy Malo", "Malo", "Regular", "Bueno", "Excelente"].map(
            (label, index) => (
              <Grid item key={index}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <Paper
                    sx={{
                      width: 75,
                      height: 84,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 1,
                    }}
                  >
                    <StarIcon sx={{ width: 43, height: 45, color: "pink" }} />
                  </Paper>
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "'Urbanist', Helvetica",
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    {label}
                  </Typography>
                </Box>
              </Grid>
            ),
          )}
        </Grid>

        <Box
          sx={{
            width: 728,
            height: 153,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 5,
            backgroundColor: "white",
            borderRadius: 2,
          }}
        >
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            placeholder="La atención me pareció..."
            sx={{
              fontFamily: "'Inter', Helvetica",
              fontSize: "0.875rem",
              color: "black",
            }}
          />
        </Box>

        <Button
          onClick={enviar}
          variant="contained"
          sx={{
            width: 168.19,
            height: 56,
            backgroundColor: "#ff4081",
            color: "white",
            fontSize: "1rem",
            fontWeight: "bold",
            mt: -1,
          }}
        >
          Enviar
        </Button>
      </Box>
    </Box>
  );
}
export default FeedbackForm