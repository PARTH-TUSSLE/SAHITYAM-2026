export const signupController = async (req: Request, res: Response) => {
  const parsedData = await SignUpSchema.safeParse(req.body);

  if (!parsedData.success) {
    res.status(400).json({
      msg: "Incorrect inputs !",
    });
    return;
  }

  try {
    const hashedPass = await bcrypt.hash(parsedData.data.password, 10);

    const user = await client.user.create({
      data: {
        name: parsedData.data.name,
        username: parsedData.data.username,
        email: parsedData.data.email,
        password: hashedPass,
      },
    });

    const profile = await client.profile.create({
      data: {
        userId: user.id,
      },
    });

    res.status(201).json({
      msg: "User created successfully !",
      user,
      profile,
    });
  } catch (error) {
    res.status(409).json({
      msg: "username or email already taken",
    });
  }
};
