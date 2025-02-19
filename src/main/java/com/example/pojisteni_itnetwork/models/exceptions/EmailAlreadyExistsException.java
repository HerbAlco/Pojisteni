package com.example.pojisteni_itnetwork.models.exceptions;

public class EmailAlreadyExistsException extends RuntimeException
{

	public EmailAlreadyExistsException()
	{
		super("Tento email je již obsazený");
	}
}
