import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  TextField,
  IconButton,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

import messages from "./messages";

const MessageField = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: `50px`,
      },
      "&.Mui-focused fieldset": {
        borderColor: "#1ED761",
      },
    },
  },
})(TextField);

const useStyles = (theme) => ({
  root: {
    width: "45%",
    height: "70%",
    display: "flex",
    flexDirection: "column",
  },
  chatHeader: {
    display: "flex",
    height: "10%",
    backgroundColor: "#1ED761",
    color: "white",
    borderRadius: "4px",
    alignItems: "center",
    justifyContent: "center",
  },
  chatPanel: {
    height: "80%",
    overflow: "auto",
  },

  avatarBubble: {
    backgroundColor: "#1ED761",
  },

  inputBlock: {
    height: "10%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: "2%",
    paddingBottom: "2%",
  },
});

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: null,
      input: "",
    };

    this.scrollToChatBottom = this.scrollToChatBottom.bind(this);
  }

  scrollToChatBottom() {
    this.panel.scrollTo(0, this.panel.scrollHeight);
  }

  componentDidMount() {
    this.scrollToChatBottom();
  }
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <div className={classes.chatHeader}>
          <Typography variant="h5">Chat Room</Typography>
        </div>

        <div
          className={classes.chatPanel}
          ref={(panel) => {
            this.panel = panel;
          }}
        >
          <List>
            {messages.map((entry, index) => (
              <ListItem key={index}>
                <ListItemAvatar>
                  <Avatar className={classes.avatarBubble}>
                    {entry.author.charAt(0).toUpperCase()}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={<Typography variant="h6">{entry.author}</Typography>}
                  secondary={
                    <Typography variant="subtitle2">{entry.message}</Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </div>

        <div className={classes.inputBlock}>
          <MessageField
            underlineShow={false}
            variant="outlined"
            placeholder="Type a message.."
            InputProps={{
              disableUnderline: true,
              style: { fontSize: "14px", height: "70%" },
            }}
            style={{ flex: 8, margin: "0% 5% 0% 5%" }}
          />

          <IconButton style={{ flex: 1, borderRadius: 0 }}>
            <SendIcon style={{ color: "#1ED761" }} />
          </IconButton>
        </div>
      </Paper>
    );
  }
}

export default withStyles(useStyles)(Chat);
