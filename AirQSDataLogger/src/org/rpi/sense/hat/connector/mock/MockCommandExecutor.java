package org.rpi.sense.hat.connector.mock;

import org.rpi.sense.hat.api.dto.CommandResult;
import org.rpi.sense.hat.connector.Command;
import org.rpi.sense.hat.connector.CommandExecutor;

/**
 * Created by jcincera on 04/07/2017.
 */
public class MockCommandExecutor implements CommandExecutor {

	@Override
	public CommandResult execute(Command command, String... args) {
		System.out.println("Mocking command: " + command.getCommand());

		MockCommandResult result = new MockCommandResult("");
		result.setCommand(command);

		return result;
	}

}
