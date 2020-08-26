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
import { getChatHistory } from "../Utils/Queries";

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
    height: "100%",
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
  },
});

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      roomID: null,
      messages: [],
      input: "",
    };

    this.scrollToChatBottom = this.scrollToChatBottom.bind(this);
    this.onInput = this.onInput.bind(this);

    this.onMessageReceive = this.onMessageReceive.bind(this);
    this.onSendMessage = this.onSendMessage.bind(this);
  }

  // Scroll to the newest message of the chat
  scrollToChatBottom() {
    this.panel.scrollTo(0, this.panel.scrollHeight);
  }

  // Keep track of the current input of the client in their message field
  onInput(e) {
    this.setState({
      input: e.traget.value,
    });
  }

  // Handler for when the user receives the message
  onSendMessage() {
    if (!this.state.input) return;

    const msg = {
      author: this.props.user,
      type: "message",
      message: this.state.input,
    };

    this.props.client.onSendMessage(this.props.roomID, msg, (err) => {
      if (err) {
        return console.log(err);
      }

      return this.setState({
        input: "",
        messages: this.state.messages.concat(msg),
      });
    });
  }

  // Handler when the client sends a message
  onMessageReceive(entry) {
    console.log("onMessageReceived: " + entry);
    this.setState({
      messages: this.state.messages.concat(entry),
    });
  }

  componentDidMount() {
    // Get messages from the DB
    getChatHistory()
      .then((res) => {
        this.setState({
          messages: res,
        });
      })
      .catch((err) => {
        alert(err);
      });

    // Register onMessageReceive
    this.props.client.registerMsgReceiver(this.onMessageReceive);

    // Send the message that this user joined??

    this.scrollToChatBottom();
  }

  componentDidUpdate() {
    this.scrollToChatBottom();
  }

  componentWillUnmount() {
    // unregister onMessageReceive
    this.props.client.unregisterMsgReceiver();

    // tell room that user is leaving???
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
                {entry.type === "message" ? (
                  <>
                    <ListItemAvatar>
                      <Avatar className={classes.avatarBubble}>
                        {entry.author.charAt(0).toUpperCase()}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="h6">{entry.author}</Typography>
                      }
                      secondary={
                        <Typography variant="subtitle2">
                          {entry.message}
                        </Typography>
                      }
                    />
                  </>
                ) : (
                  <>
                    <ListItemText
                      primary={
                        <Typography variant="h6">
                          {entry.author} {entry.message}
                        </Typography>
                      }
                    />
                  </>
                )}
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
              style: { fontSize: "14px", height: "90%" },
            }}
            style={{
              height: "100%",
              flexBasis: "90%",
              justifyContent: "center",
            }}
            onChange={this.onInput}
            value={this.state.input}
            // onKeyPress={(e) => {
            //   e.key === "Enter" ? this.onSendMessage() : null;
            // }}
          />

          <IconButton
            onClick={this.onSendMessage}
            style={{ padding: 0, borderRadius: 0 }}
          >
            <SendIcon style={{ color: "#1ED761" }} />
          </IconButton>
        </div>
      </Paper>
    );
  }
}

export default withStyles(useStyles)(Chat);
