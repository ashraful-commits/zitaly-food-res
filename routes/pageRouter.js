import path, { dirname } from 'path';
import fs, { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

import express from 'express';
import {
  addnewdata,
  afterdeleteData,
  afterverifiedDeldata,
  blogpage,
  cellVerifiy,
  cellVerifiynow,
  editdata,
  gallerypage,
  homepage,
  locationpage,
  menupage,
  newspage,
  postdata,
  reservationpage,
  staffpage,
  unverifieddata,
  verifieddata,
  verifiydata,
  viewdata,
} from '../controllers/pageControler.js';
import { userMulter } from '../middlewares/pageMiddlerwars.js';

// create rouer
export const router = express.Router();

router.get('/', homepage);
router.get('/home', homepage);
router.get('/blog', blogpage);
router.get('/gallery', gallerypage);
router.get('/location', locationpage);
router.get('/menu', menupage);
router.get('/news', newspage);
router.get('/reservation', reservationpage);
router.get('/staff', staffpage);
router.get('/admin', verifieddata);
router.get('/admin/:token', verifiydata);
router.get('/create', addnewdata);
router.post('/create', userMulter, postdata);
router.get('/unverified', unverifieddata);
router.get('/admin/:id', viewdata);
router.get('/admin/:id', editdata);
router.get('/verified/:id', afterverifiedDeldata);
router.get('/unverified/:id', afterdeleteData);
router.get('/unverified/:otp', cellVerifiy);
router.post('/unverified/:otp', cellVerifiynow);
