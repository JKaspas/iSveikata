package lt.vtvpmc.ems.isveikata.employees;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue(value = "Admin")
public class Admin extends Employee {

	public Admin() {
		super();

	}
}
