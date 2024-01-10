import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { CardActionArea } from "@mui/material";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import { Box, Paper } from "@mui/material";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Alert from "@mui/material/Alert";
import axios from "axios";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Perfect",
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialog-paperWidthSm": {
    maxWidth: "1380px",
    width: "100%",
  },
}));
const servers = ["http://localhost:3001","http://localhost:6001","http://localhost:7001"]
export default function BookCard(props) {
  const value = 4.5;
  const { id, title, price, cat, stock } = props;
  const [open, setOpen] = React.useState(false);
  const [purchaseStatus, setPurchaseStatus] = useState(null);

  const handlePurchase = async () => {
    try {
      // Get the next server URL in a round-robin fashion
      const nextServer = servers.shift();
      servers.push(nextServer);

      // Make the purchase request to the selected server
      const response = await axios.post(`${nextServer}/api/order/books/purchase`, {
        uuid: "25278d7b-7bc5-4b9e-8f8a-dc8df0944f4a",
        quantity: "1",
      });
      //for the alert component
      setPurchaseStatus({
        type: "success",
        message: nextServer+"Purchase successful!",
      });
    } catch (error) {
      console.error("Error making purchase:", error);
      setPurchaseStatus({
        type: "error",
        message: "Error making purchase. Please try again.",
      });
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Card sx={{ maxWidth: 345, m: 2 }} id="card">
        <CardActionArea onClick={handleClickOpen}>
          <CardMedia
            component="img"
            height="140"
            image="https://c4.wallpaperflare.com/wallpaper/362/276/920/nature-4k-pc-full-hd-wallpaper-preview.jpg"
          />
          <CardContent>
            <Typography align="left" gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography align="left" variant="body2" color="text.secondary">
              ${price}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {title}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Grid container spacing={1}>
            <Grid item md={5}>
              <Box
                component="img"
                sx={{
                  height: "100%",
                  width: "100%",
                }}
                src="https://c4.wallpaperflare.com/wallpaper/362/276/920/nature-4k-pc-full-hd-wallpaper-preview.jpg"
              />
            </Grid>

            <Grid item md={7}>
              <Box
                sx={{
                  height: "100%",
                }}
              >
                <Paper sx={{ height: "100%", width: "100%", p: 5 }}>
                  <Typography
                    align="left"
                    gutterBottom
                    variant="h4"
                    component="div"
                  >
                    {title}
                  </Typography>
                  <Typography align="left" variant="h6" color="text.secondary">
                    Topic: {cat}
                  </Typography>
                  <Typography align="left" variant="h6" color="text.secondary">
                    price: ${price}
                  </Typography>
                  <Typography
                    align="left"
                    variant="body0"
                    color="text.secondary"
                  >
                    Number in Stock: {stock}
                  </Typography>
                  <br />
                  <Typography
                    align="left"
                    variant="body0"
                    color="text.secondary"
                  >
                    uuid: {id}
                  </Typography>
                  <Typography
                    align="left"
                    variant="body1"
                    color="text.secondary"
                  >
                    Rating:
                  </Typography>
                  <Box
                    sx={{
                      width: 200,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Rating
                      name="text-feedback"
                      value={value}
                      readOnly
                      precision={0.5}
                      emptyIcon={
                        <StarIcon
                          style={{ opacity: 0.55 }}
                          fontSize="inherit"
                        />
                      }
                    />
                    <Box sx={{ ml: 2 }}>{labels[value]}</Box>
                  </Box>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handlePurchase}>
            Purchase
          </Button>
        </DialogActions>
        {purchaseStatus && (
          <Alert
            severity={purchaseStatus.type}
            onClose={() => setPurchaseStatus(null)}
          >
            {purchaseStatus.message}
          </Alert>
        )}
      </BootstrapDialog>
    </>
  );
}
