import env from './configs/env';
import express, { response } from 'express';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);

// !! catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404));
});

// !! error handler
app.use((err, req, res, next) => {
	let apiError = err;

	if (!err.status) {
		apiError = createError(err);
	}

	// ! set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = env.node_env === 'development' ? apiError : {};

	return response(res, { message: apiError.message }, apiError.status);
});

export default app;
