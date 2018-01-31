package lt.vtvpmc.ems.isveikata.api;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Data;

@Entity
@Data
public class Api {

	@Id
	@GeneratedValue
	private long id;
	private String title;
	private String description;
	private String measurements;

//	public String getTitle() {
//		return title;
//	}
//
//	public void setTitle(String title) {
//		this.title = title;
//	}
//
//	public String getDescription() {
//		return description;
//	}
//
//	public void setDescription(String description) {
//		this.description = description;
//	}
//
//	public String getMeasurements() {
//		return measurements;
//	}
//
//	public void setMeasurements(String measurements) {
//		this.measurements = measurements;
//	}

}
