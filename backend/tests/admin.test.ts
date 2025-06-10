/// <reference types="mocha" />
import app from '../src/server';
import request from 'supertest';
import { expect } from 'chai';
import mongoose from 'mongoose';