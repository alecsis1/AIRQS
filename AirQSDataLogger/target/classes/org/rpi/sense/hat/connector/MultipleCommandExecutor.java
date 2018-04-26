package org.rpi.sense.hat.connector;

import org.rpi.sense.hat.api.dto.CommandResult;
import org.rpi.sense.hat.exception.InvalidSystemArchitectureException;

/**
 * Created by jcincera on 27/06/2017.
 */
public class MultipleCommandExecutor implements CommandExecutor {

	MultipleCommandExecutor() {
		if (!System.getProperty("os.arch").toLowerCase().contains("arm")) {
			throw new InvalidSystemArchitectureException(
					"System architecture is not supported for this command executor");
		}
	}

	@Override
	public CommandResult execute(Command command, String... args) {
		throw new UnsupportedOperationException("Not supported yet");
	}
}
