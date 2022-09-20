import path, { dirname } from 'path';
import fs, { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

// home page show
export const homepage = (req, res) => {
  res.render('index');
};
// blog page
export const blogpage = (req, res) => {
  res.render('archive');
};

// gallery show
export const gallerypage = (req, res) => {
  res.render('gallery');
};
// staff show
export const staffpage = (req, res) => {
  res.render('staff');
};

// location page
export const locationpage = (req, res) => {
  res.render('location');
};

// menu page
export const menupage = (req, res) => {
  res.render('menu');
};

// news page
export const newspage = (req, res) => {
  res.render('news');
};

// reservation page

export const reservationpage = (req, res) => {
  res.render('reservation');
};

// add new data
export const addnewdata = (req, res) => {
  res.render('database/create');
};

// post
export const postdata = (req, res) => {
  const user = JSON.parse(
    readFileSync(path.join(__dirname, '../db/email.json'))
  );
  const { photo, email, cell } = req.body;
  user.push({
    id: user.length - 1 + 2,
    photo: req.file.filename,
    email: email,
    cell: cell,
    token: Math.floor(Math.random() * 1000),
    verified: false,
  });
  writeFileSync(
    path.join(__dirname, '../db/email.json'),
    JSON.stringify(user)
  );
  res.redirect('/admin');
};

// verified data
export const verifieddata = (req, res) => {
  const user = JSON.parse(
    readFileSync(path.join(__dirname, '../db/email.json'))
  );

  const verifiedData = user.filter((data) => data.verified == true);
  res.render('database/verified', {
    user: verifiedData,
  });
};

// unverified data
export const unverifieddata = (req, res) => {
  const user = JSON.parse(
    readFileSync(path.join(__dirname, '../db/email.json'))
  );
  const unverifiedData = user.filter(
    (data) => data.verified == false
  );
  console.log('hello');

  res.render('database/unverified', {
    user: unverifiedData,
  });
};

// view
export const viewdata = (req, res) => {
  res.render('database/view');
};
export const editdata = (req, res) => {
  res.render('database/edit');
};
