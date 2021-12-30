import { Response, Router } from 'express';
import { BaseRequest } from '../../shared/dtos/Request';
import { BaseException } from '../../Exceptions/BaseException';
import { UserModel } from '../../models/user.model';
import { sign } from 'jsonwebtoken';
import { RequestUserDTO } from '../../shared/dtos/RequestUserDTO';
import { SignInDTO } from '../../auth/dtos/SignInDTO';

const router = Router();

router.post('/login', async (req: BaseRequest<SignInDTO>, res: Response) => {
	if (req.user) {
		throw new BaseException(
			400,
			'ALREADY_LOGGED_IN',
			'You are already logged in'
		);
	}
	const userDTO = req.body;
	const { usernameEmailPhoneNumber, password } = userDTO;
	console.log(password);
	try {
		const user = await UserModel.findOne({
			$or: [
				{ username: usernameEmailPhoneNumber },
				{ email: usernameEmailPhoneNumber },
				{ phoneNumber: usernameEmailPhoneNumber },
			],
		});
		if (!user) {
			throw new BaseException(
				404,
				'NOT_FOUND',
				'No user found with this credentials'
			);
		}

		const passwordCorrect = await user.compare(password);

		if (!passwordCorrect) {
			throw new BaseException(
				404,
				'WRONG_CREDENTIALS',
				'You entered the wrong credentials'
			);
		}

		const requestUser = new RequestUserDTO(user.toObject());

		const token = sign({ ...requestUser }, process.env.JWT_SECRET!);

		return res.json({
			token,
			user: requestUser,
		});
	} catch (e: any) {
		console.log(e.message);
		if (e instanceof BaseException) {
			throw e;
		} else {
			throw new BaseException(400, '', e.message);
		}
	}
});

export { router as login };
