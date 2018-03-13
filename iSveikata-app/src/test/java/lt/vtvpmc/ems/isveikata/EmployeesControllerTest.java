package lt.vtvpmc.ems.isveikata;

import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;
import static org.mockito.internal.verification.VerificationModeFactory.times;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;

import lt.vtvpmc.ems.isveikata.employees.EmployeesController;
import lt.vtvpmc.ems.isveikata.employees.EmployeesService;
import lt.vtvpmc.ems.isveikata.patient.Patient;
import lt.vtvpmc.ems.isveikata.patient.PatientService;





@RunWith(SpringJUnit4ClassRunner.class)
public class EmployeesControllerTest {

    private MockMvc mockMvc;

    @InjectMocks
    private EmployeesController employeesController;

    @Mock
    private PatientService patientService;

    @Mock
    private EmployeesService employeesService;

    @Before
    public void init() throws Exception{
        mockMvc = MockMvcBuilders.standaloneSetup(employeesController)
                .build();
    }

    @Test
    public void getDoctorPatient() throws Exception{
        List<Object> patientList = new ArrayList<>();
        Patient patient = new Patient();
        patient.setFirstName("Antanas");
        patientList.add(new Patient());
        patientList.add(new Patient());
        when(patientService.getAllPagedPatientByDoctorForCsv("AntPet601")).thenReturn(patientList);
        given(patientService.getAllPagedPatientByDoctorForCsv("AntPet600")).willReturn(Collections.emptyList());

        mockMvc.perform(get("/api/doctor/{userName}/patient/csv", "AntPet601" ))
                .andDo(print())
            .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(jsonPath("$", hasSize(2)));
        Mockito.verify(patientService, times(1)).getAllPagedPatientByDoctorForCsv("AntPet601");
        verifyNoMoreInteractions(patientService);
    }



    public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


}
