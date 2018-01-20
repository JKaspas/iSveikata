package lt.vtvpmc.ems.isveikata.employees;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.validation.constraints.NotNull;
import lombok.Data;

@Entity
@Data
@DiscriminatorValue(value = "druggist")
public class Druggist extends Employee {

	@NotNull
	private String DrugStore;

}
