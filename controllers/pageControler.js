import path, { dirname } from 'path';
import fs, { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { sendEMail } from '../utility/sendEmail.js';
import { sendSMSfuction } from '../utility/sendSms.js';

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
export const postdata = async (req, res) => {
  const user = JSON.parse(
    readFileSync(path.join(__dirname, '../db/email.json'))
  );
  const token = Date.now() + Math.floor(Math.random() * 1000);
  const otp = Math.floor(Math.random() * 1000);
  const { name, photo, email, cell } = req.body;
  await sendSMSfuction(
    cell,
    `Hi ${name}, How are you? Your OTP is ${otp}`
  );
  await sendEMail(email, 'Hi', { name, email, cell, token });
  user.push({
    id: user.length - 1 + 2,
    name: name,
    photo: req.file.filename,
    email: email,
    cell: cell,
    token: token,
    verified: false,
    otp: otp,
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

export const verifiydata = (req, res) => {
  const user = JSON.parse(
    readFileSync(path.join(__dirname, '../db/email.json'))
  );
  const token = req.params.token;

  user[user.findIndex((data) => data.token == token)] = {
    ...user[user.findIndex((data) => data.token == token)],
    verified: true,
  };

  writeFileSync(
    path.join(__dirname, '../db/email.json'),
    JSON.stringify(user)
  );

  res.redirect('/admin');
};

// DELETE DATA

export const afterverifiedDeldata = (req, res) => {
  const user = JSON.parse(
    readFileSync(path.join(__dirname, '../db/email.json'))
  );
  const verId = req.params.id;
  const afterverdelete = user.filter((data) => data.id != verId);
  writeFileSync(
    path.join(__dirname, '../db/email.json'),
    JSON.stringify(afterverdelete)
  );
  res.redirect('/admin');
};

export const afterdeleteData = (req, res) => {
  const user = JSON.parse(
    readFileSync(path.join(__dirname, '../db/email.json'))
  );
  const id = req.params.id;
  const afterdelete = user.filter((data) => data.id != id);
  writeFileSync(
    path.join(__dirname, '../db/email.json'),
    JSON.stringify(afterdelete)
  );
  res.redirect('/unverified');
};

// verify with cell

export const cellVerifiy = (req, res) => {
  res.render('database/cell');
};

export const cellVerifiynow = (req, res) => {
  const user = JSON.parse(
    readFileSync(path.join(__dirname, '../db/email.json'))
  );
  const { otp } = req.body;

  user[user.findIndex((data) => data.otp == otp)] = {
    ...user[user.findIndex((data) => data.otp == otp)],
    verified: true,
    token: '',
  };

  writeFileSync(
    path.join(__dirname, '../db/email.json'),
    JSON.stringify(user)
  );

  res.redirect('/admin');
};
