import { Response, Router } from 'express';
import { BaseRequest } from '../../shared/dtos/Request';
import { SignUpDTO } from '../../auth/dtos/SignUpDTO';
import { BaseException } from '../../Exceptions/BaseException';
import { UserModel } from '../../models/user.model';
import { sign } from 'jsonwebtoken';
import { RequestUserDTO } from '../../shared/dtos/RequestUserDTO';
import { plainToInstance } from 'class-transformer';

const router = Router();

router.post('/register', async (req: BaseRequest<SignUpDTO>, res: Response) => {
	if (req.user) {
		throw new BaseException(
			400,
			'ALREADY_LOGGED_IN',
			'You are already logged in'
		);
	}
	const userDTO = req.body;
	const { username, email, phoneNumber } = userDTO;
	try {
		const foundUser = await UserModel.findOne({
			$or: [{ username }, { email }, { phoneNumber }],
		});
		if (foundUser) {
			throw new BaseException(
				400,
				'USER_ALREADY_EXISTS',
				'a user with the entered credentials already exists'
			);
		}

		const user = await UserModel.create(userDTO);

		if (!user) {
			throw new BaseException(
				400,
				'ERROR_STORING_USER',
				'Error while trying to store the user to the database'
			);
		}

		const requestUser = new RequestUserDTO(user.toObject());

		const token = sign({ ...requestUser }, process.env.JWT_SECRET!);

		return res.json({
			token,
			user: requestUser,
		});
	} catch (e: any) {
		console.log(e);
		if (e instanceof BaseException) {
			throw e;
		} else {
			throw new BaseException(400, '', e.message);
		}
	}
});

export { router as register };
