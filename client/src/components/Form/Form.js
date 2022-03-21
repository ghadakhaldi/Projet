import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ owner: '',city: '', descreption: '', moreDetails : '', addPictures: ''});
  const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({ owner: '',city: '', descreption: '', moreDetails : '', addPictures: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost(postData));
      clear();
    } else {
      dispatch(updatePost(currentId, postData));
      console.log(currentId)
      clear();
    }
  };

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${post.title}"` : 'add a post '}</Typography>
        <TextField name="owner" variant="outlined" label="owner" fullWidth value={postData.owner} onChange={(e) => setPostData({ ...postData, owner: e.target.value })} />
        <TextField name="city" variant="outlined" label="city" fullWidth value={postData.city} onChange={(e) => setPostData({ ...postData, city: e.target.value })} />
        <TextField name="description" variant="outlined" label="descreption" fullWidth multiline rows={4} value={postData.descreption} onChange={(e) => setPostData({ ...postData, descreption: e.target.value })} />
        <TextField name="moreDetails" variant="outlined" label="moreDetails " fullWidth value={postData.moreDetails} onChange={(e) => setPostData({ ...postData, moreDetails: e.target.value.split(',') })} />
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, addPictures: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;