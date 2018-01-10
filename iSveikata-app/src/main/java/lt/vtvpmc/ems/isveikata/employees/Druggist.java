package lt.vtvpmc.ems.isveikata.employees;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.validation.constraints.NotNull;


@Entity
@DiscriminatorValue(value = "Druggist")
public class Druggist extends Employee {
	@NotNull
	private String DrugStore;
	
	public Druggist() {
		
	}
	public Druggist(String drugStore) {
		super();
		DrugStore = drugStore;
	}

	
	public String getDrugStore() {
		return DrugStore;
	}

	public void setDrugStore(String drugStore) {
		DrugStore = drugStore;
	}
	
	
	
	
	
	
    

    
	
}
